import { getUserId } from "@/utlis/storage";

const state = {
  uid: getUserId() || null
}

export default state