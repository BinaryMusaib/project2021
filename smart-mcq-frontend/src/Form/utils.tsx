export function coercer(to?: "int") {
    if (!to) return (v: string) => v;
    else {
        switch (to) {
            case "int":
                return (v: string) => Number.parseInt(v);

            default:
                throw new Error("Unknown coerce");
        }
    }
}
