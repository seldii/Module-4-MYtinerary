import React from "react";
import { GoogleLogout } from "react-google-login";

export default function GoogleLogout() {
  return <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />;
}
