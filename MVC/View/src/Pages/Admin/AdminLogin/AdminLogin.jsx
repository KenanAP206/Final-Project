import React from 'react'

function AdminLogin() {
  const handleLogin = (event) => {
    event.preventDefault();
    // Giriş işlemleri burada yapılacak
  };

  return (
    <div>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Kullanıcı Adı:</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Şifre:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  )
}

export default AdminLogin
