"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AadhaarEntity = void 0;
class AadhaarEntity {
    _aadhaarNumber;
    _name;
    _dob;
    _gender;
    _address;
    _pincode;
    constructor(aadhaarNumber, name, dob, gender, address, pincode) {
        this._aadhaarNumber = aadhaarNumber;
        this._name = name;
        this._dob = dob;
        this._gender = gender;
        this._address = address;
        this._pincode = pincode;
    }
    get aadhaarNumber() {
        return this._aadhaarNumber;
    }
    get name() {
        return this._name;
    }
    get dob() {
        return this._dob;
    }
    get gender() {
        return this._gender;
    }
    get address() {
        return this._address;
    }
    get pincode() {
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
exports.AadhaarEntity = AadhaarEntity;
//# sourceMappingURL=Aadhaar.entity.js.map