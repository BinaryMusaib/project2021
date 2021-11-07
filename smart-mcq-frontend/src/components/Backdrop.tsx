import "./Backdrop.css";

type BackdropProps = {
    visible: boolean;
};

export default function Backdrop({ visible }: BackdropProps) {
    if (!visible) return <span />;
    return (
        <div data-testid="backdrop" id="backdrop" className="backdrop"></div>
    );
}
