module.exports = class UserDto {
  email;
  name;
  id;
  isActivated;
  isAdmin;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.isAdmin = model.isAdmin;
  }
};
