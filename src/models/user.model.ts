/**
 * Backwards-compatible re-export of the canonical User model.
 *
 * New code should import from `@/lib/db/models/User`, but existing code
 * still imports from `@/models/user.model`. To avoid breaking anything,
 * this file simply re-exports `UserModel` as the default export.
 */
import { UserModel } from "@/lib/db/models/User";

export default UserModel;