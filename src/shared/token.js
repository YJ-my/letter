const getToken = () => {
    const token = sessionStorage.getItem("jwtToken");
  
    if (token) {
      console.log(token);  
      return token;
    } else {
      return null;
    }
  };
  
  const setToken = (token) => {
    if (!token) {
      return false;
    }
    sessionStorage.setItem("jwtToken", token);
  };
  
  const delToken = () => {
    sessionStorage.removeItem("jwtToken");
  };
  
  export { getToken, setToken, delToken };