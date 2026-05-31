export class AadhaarValidationService {
  public isAadhaarFront(text: string): boolean {
    let score = 0;

    const upper = text.toUpperCase();

    if (upper.includes("GOVERNMENT")) score += 2;

    if (upper.includes("FEMALE")) {
      score += 1;
    } else if (upper.match(/\bMALE\b/)) {
      score += 1;
    }

    if (/\d{4}\s\d{4}\s\d{4}/.test(text))
      score += 3;

    return score >= 3;
  }

  public isAadhaarBack(text: string): boolean {
    let score = 0;

    const upper = text.toUpperCase();

    if (upper.includes("ADDRESS")) score += 2;

    if (upper.includes("AADHAAR")) score += 1;

    if (upper.includes("PIN")) score += 1;

    if (/\d{6}/.test(text))
      score += 1; // pincode

    return score >= 2;
  }
}