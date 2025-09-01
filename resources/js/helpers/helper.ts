export function formatDate(tanggal: string) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(tanggal)) {
        return "wrong format";
    }
    let date = new Date(tanggal);
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}
