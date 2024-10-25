import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Component() {
  // Sample data for the table
  const tableData = Array(20)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      athlete: `Athlete ${index + 1}`,
      sport: `Sport ${(index % 8) + 1}`,
      medal: ["Gold", "Silver", "Bronze", "None"][index % 4],
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-yellow-400 to-red-500 p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="olympic-pattern"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="28"
                stroke="rgba(0,174,239,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="18"
                stroke="rgba(246,201,14,0.1)"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#olympic-pattern)" />
          </svg>
        </div>

        {/* Table container */}
        <div className="relative bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="p-4 sm:p-6 md:p-8 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Olympic Medal Tracker
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Athlete</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead className="text-right">Medal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.athlete}</TableCell>
                    <TableCell>{item.sport}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.medal === "Gold"
                            ? "bg-yellow-200 text-yellow-800"
                            : item.medal === "Silver"
                            ? "bg-gray-200 text-gray-800"
                            : item.medal === "Bronze"
                            ? "bg-orange-200 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.medal}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
