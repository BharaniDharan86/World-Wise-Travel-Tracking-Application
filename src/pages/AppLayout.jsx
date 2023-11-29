// import Map from "../components/Map";
// import SideBar from "../components/SideBar";
// import { useAuth } from "../context/FakeUserContext";
// import styles from "./AppLayout.module.css";
// import User from "../components/User";
// function AppLayout() {
//   const { user } = useAuth();
//   return (
//     <div className={styles.app}>
//       {/* {user || <User />} */}
//       <SideBar />
//       <Map />
//     </div>
//   );
// }

// export default AppLayout;

import Map from "../components/Map";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/FakeUserContext";
import styles from "./AppLayout.module.css";
import User from "../components/User";

function AppLayout() {
  const { user } = useAuth();

  return (
    <div className={styles.app}>
      {user && <User />}
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
