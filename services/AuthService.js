class AuthService {
  constructor(request) {
    this.request = request;
  }

  async login(email, password) {
    return this.request.post('/users/login', {
      data: { email, password },
    });
  }
}

module.exports = { AuthService };
