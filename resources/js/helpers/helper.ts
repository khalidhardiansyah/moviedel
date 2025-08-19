export function formatDate(tanggal: string) {
    let date = new Date(tanggal);
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}
