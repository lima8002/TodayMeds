import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onGetMedsByUser,
  onAddNewMedToDB,
  onUpdateMeds,
  onDeleteMedById,
  onUpdateIntake,
  onDeleteMedByEmail,
} from "@/utils/FirebaseHelper";
import { Intake, MedsDB } from "../constants/Types";
import {
  checkAndDeleteNotifications,
  deleteAllNotifications,
  scheduleNotifications,
} from "@/utils/Notifications";
import { useAuthContext } from "./AuthProvider";

interface MedsContextType {
  medications: MedsDB[];
  fetchMeds: (userEmail: string) => Promise<void>;
  setMedications: React.Dispatch<React.SetStateAction<MedsDB[]>>;
  addMedication: (medication: Omit<MedsDB, "id" | "intake">) => Promise<void>;
  updateMedication: (
    id: string,
    medication: Partial<MedsDB>,
    newIntake?: string
  ) => Promise<void>;
  updateIntake: (
    medicationId: string,
    intakeId: string,
    taken: boolean
  ) => Promise<void>;
  deleteAllMedication: (id: string) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  getAllIntakes: () => Intake[];
}

const MedsContext = createContext<MedsContextType | undefined>(undefined);

interface MedsProviderProps {
  children: React.ReactNode;
}

const MedsProvider: React.FC<MedsProviderProps> = ({ children }) => {
  const { user } = useAuthContext();
  const [medications, setMedications] = useState<MedsDB[]>([]);

  useEffect(() => {
    const getMedsDetails = async () => {
      await fetchMeds(user?.email || "");
    };
    getMedsDetails();
  }, []);

  const fetchMeds = async (userEmail: string) => {
    try {
      const result = await onGetMedsByUser(userEmail);
      setMedications(result);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const addMedication = async (medication: Omit<MedsDB, "id" | "intake">) => {
    if (!user?.email) {
      console.error("User email is missing. Cannot add medication.");
      return;
    }
    try {
      const RefId = Date.now().toString();
      const newMedication: MedsDB = {
        ...medication,
        id: RefId,
        email: user?.email,
        intakeRef: RefId,
        intake: calculateIntakeArray(medication, RefId),
      };
      const docRef = await onAddNewMedToDB(newMedication);
      if (docRef) {
        const newMedicationWithId: MedsDB = {
          ...newMedication,
          id: docRef?.id,
        };
        await scheduleNotifications(newMedicationWithId);
      }
      await fetchMeds(user.email);
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const calculateIntakeArray = (
    medication: Omit<MedsDB, "id" | "intake">,
    RefId: string
  ) => {
    const intake: Intake[] = [];
    const startDateTime = new Date(medication.dateTime);
    const frequencyHours = medication.frequency;
    const totalDoses =
      parseInt(medication.quantity) / parseInt(medication.dosage);

    for (let i = 0; i < totalDoses; i++) {
      const intakeDateTime = new Date(
        startDateTime.getTime() + i * frequencyHours * 60 * 60 * 1000
      );
      intake.push({
        intakeRef: RefId,
        intakeId: i.toString(),
        dateTime: intakeDateTime.toISOString(),
        taken: false,
      });
    }

    return intake;
  };

  const getAllIntakes = (): Intake[] => {
    return medications
      .filter((med) => med.active)
      .flatMap((med) => med.intake || [])
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
  };

  const updateMedication = async (
    id: string,
    updatedMedication: Partial<MedsDB>,
    newIntake?: string
  ) => {
    try {
      const medsToUpdate = medications.find((med) => med.id === id);

      if (!medsToUpdate) {
        throw new Error("Medication not found");
      }
      if (newIntake === undefined || "") {
        await onUpdateMeds(id, { ...medsToUpdate, ...updatedMedication });
      } else {
        const intake = calculateIntakeArray(
          updatedMedication as MedsDB,
          medsToUpdate.intakeRef
        );
        const updatedMedicationWithIntake: Partial<MedsDB> = {
          ...updatedMedication,
          intake: intake,
        };
        await onUpdateMeds(id, updatedMedicationWithIntake);
        await scheduleNotifications(updatedMedicationWithIntake);
      }

      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  const updateIntake = async (
    medicationId: string,
    intakeId: string,
    taken: boolean
  ) => {
    try {
      await onUpdateIntake(medicationId, intakeId, taken);
      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error updating intake:", error);
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      const notifitcationsToDelete = medications.find((med) => med.id === id);
      if (notifitcationsToDelete) {
        await checkAndDeleteNotifications(notifitcationsToDelete?.intakeRef);
      }
      await onDeleteMedById(id);
      await fetchMeds(user?.email || "");
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const deleteAllMedication = async (id: string) => {
    try {
      await onDeleteMedByEmail(id);
      await deleteAllNotifications();
      await fetchMeds(user?.email || "");
      setMedications([]);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const contextValue: MedsContextType = {
    medications,
    fetchMeds,
    setMedications,
    addMedication,
    updateMedication,
    updateIntake,
    deleteAllMedication,
    deleteMedication,
    getAllIntakes,
  };

  return (
    <MedsContext.Provider value={contextValue}>{children}</MedsContext.Provider>
  );
};

export const useMedsContext = (): MedsContextType => {
  const context = useContext(MedsContext);
  if (context === undefined) {
    throw new Error("useMedsContext must be used within a MedsProvider");
  }
  return context;
};

export default MedsProvider;
