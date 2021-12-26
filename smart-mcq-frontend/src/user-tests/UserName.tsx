import { UserDto } from "../dto";

type UserNameProps = {
    user?: UserDto;
};

export default function UserName({ user }: UserNameProps) {
    return (
        <span className="user-name">
            {user?.firstName ?? ""} {user?.lastName ?? ""}
        </span>
    );
}
