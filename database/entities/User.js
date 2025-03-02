class User {
  static TABLE_NAME = "User";
  static ID_COLUMN = "userId";
  static NAME_COLUMN = "name";
  static EMAIL_COLUMN = "email";
  static PASSWORD_COLUMN = "password";
  static AGE_COLUMN = "age";
  static GENDER_COLUMN = "gender";
  static TARGET_COLUMN = "target";
  static CREATE_USER_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${User.TABLE_NAME} (
      ${User.ID_COLUMN} TEXT PRIMARY KEY,
      ${User.EMAIL_COLUMN} TEXT,
      ${User.NAME_COLUMN} TEXT,
      ${User.PASSWORD_COLUMN} TEXT,
      ${User.AGE_COLUMN} INTEGER,
      ${User.GENDER_COLUMN} TEXT,
      ${User.TARGET_COLUMN} TEXT
    );
  `;
  constructor(userId, name, email, password, age, gender, target) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.target = target;
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }

  getGender() {
    return this.gender;
  }

  getTarget() {
    return this.target;
  }

  getAge() {
    return this.age;
  }
  toString() {
    return `User {
      userId: ${this.userId},
      name: ${this.name},
      email: ${this.email},
      password: ${this.password},
      age: ${this.age},
      gender: ${this.gender},
      target: ${this.target}
    }`;
  }
}

function createUserInstance(user) {
  return Object.assign(new User(), user);
}
export { User, createUserInstance };
