export class AadhaarEntity {
  private _aadhaarNumber: string;
  private _name: string;
  private _dob: string;
  private _gender: string;
  private _address?: string;
  private _pincode?: string;

  constructor(
    aadhaarNumber: string,
    name: string,
    dob: string,
    gender: string,
    address?: string,
    pincode?: string
  ) {
    this._aadhaarNumber = aadhaarNumber;
    this._name = name;
    this._dob = dob;
    this._gender = gender;
    this._address = address;
    this._pincode = pincode;
  }

  get aadhaarNumber(): string {
    return this._aadhaarNumber;
  }

  get name(): string {
    return this._name;
  }

  get dob(): string {
    return this._dob;
  }

  get gender(): string {
    return this._gender;
  }

  get address(): string | undefined {
    return this._address;
  }

  get pincode(): string | undefined {
    return this._pincode;
  }

  // Handy for Express res.json() to automatically serialize the entity properly
  toJSON() {
    return {
      aadhaarNumber: this._aadhaarNumber,
      name: this._name,
      dob: this._dob,
      gender: this._gender,
      address: this._address,
      pincode: this._pincode,
    };
  }
}
