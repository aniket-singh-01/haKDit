export interface IAadhaarData {
	file: File | null;
	name: string | null;
	dob: string | null;
	docno: string | null;
	gender: string | null;
}

export interface IPanData {
	file: File | null;
	name: string | null;
	dob: string | null;
	docno: string | null;
	fathername: string | null;
}

export interface IEwsData {
	file: File | null;
	name: string | null;
	docno: string | null;
	certno: string | null;
	dateofissue: string | null;
	validtill: string | null;
	income: string | null;
	caste: string | null;
	address: string | null;
	fathername: string | null;
}

export interface ILicenseData {
	name: string | null;
	parentname: string | null;
	dob: string | null;
	validupto: string | null;
	dlnumber: string | null;
	address: string | null;
	issuingauthority: string | null;
	file: File | null;
}

export interface IPwdData {
	file: File | null;
	name: string | null;
	certno: string | null;
	dateofissue: string | null;
	dob: string | null;
	gender: string | null;
	regno: string | null;
	address: string | null;
	disabilitypercentage: string | null;
	disabilitytype: string | null;
	fathername: string | null;
}

export interface ICasteCertData {
	file: File | null;
	name: string | null;
	certno: string | null;
	fathername: string | null;
	address: string | null;
	caste: string | null;
}

export interface IGateScoreData {
	file: File | null;
	name: string | null;
	parentname: string | null;
	regno: string | null;
	dob: string | null;
	exampaper: string | null;
	gatescore: string | null;
	marks: string | null;
	air: string | null;
	validupto: string | null;
	qualifyingmarks: string | null;
	caste: string | null;
}

export interface IResponse {
	name?: string | null;
	dob?: string | null;
	docno?: string | null;
	gender?: string | null;
	fathername?: string | null;
	certno?: string | null;
	dateofissue?: string | null;
	validtill?: string | null;
	income?: string | null;
	caste?: string | null;
	address?: string | null;
	regno?: string | null;
	disabilitypercentage?: string | null;
	disabilitytype?: string | null;
	parentname?: string | null;
	exampaper?: string | null;
	gatescore?: string | null;
	marks?: string | null;
	air?: string | null;
	validupto?: string | null;
	qualifyingmarks?: string | null;
}
export interface IUserData {
	name: string | null;
	documentId: string | null;
	documentType: string | null;
}

export interface IDialogs {
	dialog1: boolean;
	dialog2: boolean;
	dialog3: boolean;
	errorDialog: boolean;
}
