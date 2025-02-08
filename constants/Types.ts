export interface UserDB {
  email: string;
  name: string;
  dob: string;
  photo: string;
}

export interface MedsDB {
  id: string;
  email: string;
  name: string;
  dosage: string;
  frequency: number;
  dateTime: string;
  quantity: string;
  withFoodWater: boolean;
  active: boolean;
  intakeRef: string;
  intake: Intake[];
}

export interface Intake {
  intakeRef: string;
  intakeId: string;
  dateTime: string;
  taken: boolean;
}
