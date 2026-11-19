export const departments = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Architecture",
];
export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const defaultCollege = {
  name: "MOHAMED SATHAK A.J. COLLEGE OF ENGINEERING & ARCHITECTURE",
  address: "34, Rajiv Gandhi Salai (OMR), Egattur, Siruseri, Chennai - 603 103",
  principal: "Principal",
};

export const sampleStudents = [
  { id: "s1", name: "sajjadh samiha", regNo: "310122104001", department: departments[0], academicYear: "2025-2026", year: "3", semester: "5", section: "A", dob: "2004-03-12", bloodGroup: "B+", email: "arjun.kumar@example.com", phone: "9876543210", photo: "", status: "Active", cardGenerated: true },
  { id: "s2", name: "sheru bhai", regNo: "310122205014", department: departments[1], academicYear: "2025-2026", year: "3", semester: "5", section: "B", dob: "2004-07-25", bloodGroup: "O+", email: "fatima.r@example.com", phone: "9876501234", photo: "", status: "Active", cardGenerated: true },
  { id: "s3", name: "Karthik Subramanian", regNo: "310123106022", department: departments[3], academicYear: "2025-2026", year: "2", semester: "3", section: "A", dob: "2005-01-08", bloodGroup: "A+", email: "karthik.s@example.com", phone: "9123456780", photo: "", status: "Active", cardGenerated: false },
  { id: "s4", name: "Meera Nair", regNo: "310124103007", department: departments[2], academicYear: "2025-2026", year: "1", semester: "1", section: "C", dob: "2006-11-30", bloodGroup: "AB+", email: "meera.nair@example.com", phone: "9988776655", photo: "", status: "Active", cardGenerated: false },
  { id: "s5", name: "Imran Basha", regNo: "310121108031", department: departments[4], academicYear: "2025-2026", year: "4", semester: "7", section: "A", dob: "2003-05-19", bloodGroup: "O-", email: "imran.b@example.com", phone: "9090909090", photo: "", status: "Inactive", cardGenerated: true },
  { id: "s6", name: "Priya Lakshmi", regNo: "310123301012", department: departments[5], academicYear: "2025-2026", year: "2", semester: "4", section: "B", dob: "2005-09-02", bloodGroup: "A-", email: "priya.l@example.com", phone: "8765432109", photo: "", status: "Active", cardGenerated: false },
];

const SKEY = "scms_students";
const CKEY = "scms_college";

export function loadStudents() {
  try {
    const raw = localStorage.getItem(SKEY);
    return raw ? JSON.parse(raw) : sampleStudents;
  } catch { return sampleStudents; }
}
export function saveStudents(list) {
  try { localStorage.setItem(SKEY, JSON.stringify(list)); }
  catch { alert("Storage is full. Try a smaller photo."); }
}
export function loadCollege() {
  try {
    const raw = localStorage.getItem(CKEY);
    return raw ? { ...defaultCollege, ...JSON.parse(raw) } : defaultCollege;
  } catch { return defaultCollege; }
}
export function saveCollege(c) { localStorage.setItem(CKEY, JSON.stringify(c)); }

// Card is valid until June of the student's final year (4-year course)
export function validTill(s) {
  const endYear = parseInt((s.academicYear || "").split("-")[1] || new Date().getFullYear(), 10);
  return `June ${endYear + (4 - Number(s.year || 1))}`;
}
export function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
