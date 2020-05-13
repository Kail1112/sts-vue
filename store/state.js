import {mainState} from "./main";
import {userState} from "./user";

const includesState = () => ({
  ...mainState,
  ...userState
})

export default includesState
