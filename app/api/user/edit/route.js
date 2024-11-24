// route.js
import { updateUser } from "../../../actions/updateUser";

export async function PUT(request) {
  return await updateUser(request.nextUrl.searchParams);
}
