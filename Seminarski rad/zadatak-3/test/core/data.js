module.exports = {
  valid: {
    name: "Luka Hadžić",
    email: "luka@gmail.com",
    phone9: "061123456",
    address: "Zmaja od Bosne 12",
  },
  invalid: {
    name2: "Luka123!!!!!!Hadzić!!!!",
    emailEmpty: "",
    emailNoAt: "lukagmail.com",
    emailNoDomain: "luka@",
    nameEmpty: "",
    nameWithNumbers: "Luka123",
    phoneEmpty: "",
    phoneLetters: "061ABC",
    phoneTooShort: "06123456",   
    phoneTooLong: "01236123456789123112",  
    addressEmpty: "",
    addressTooShort: "A",
    addressSpecial: "@@@!!!###$$$%%%^^^&&&***((()))",
  },
};
