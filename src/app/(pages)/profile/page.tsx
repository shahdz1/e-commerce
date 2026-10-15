import ProfileInfo from "./ProfileInfo";
import { getAddress } from "@/services/addressesAction/getAddress.action";

export default async function ProfilePage() {
    const response = await getAddress();

    return <ProfileInfo addresses={response.data} />;
}
