import GuestLayout from "../../components/GuestLayout";

export default function ForgotPasswordConfirmation() {
    return (
        <GuestLayout title="Link Sent">
            <div className="confirmation-text">
                <h3>
                    If this is a registered email address then we have sent you
                    an email. Please check the email and set your new password.
                </h3>
            </div>
        </GuestLayout>
    );
}
