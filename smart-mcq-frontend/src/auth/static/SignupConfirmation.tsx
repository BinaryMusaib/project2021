import GuestLayout from "../../components/GuestLayout";

export default function SignUpConfirmation() {
    return (
        <GuestLayout title="Check Email">
            <div className="confirmation-text">
                <h3>
                    Thanks for signing up. Please check your email to complete
                    the signup process.
                </h3>
            </div>
        </GuestLayout>
    );
}
