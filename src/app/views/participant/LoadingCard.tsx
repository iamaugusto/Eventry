import { Card, CardContent, Skeleton, Divider } from "@mui/material";

export function LoadingCard() {
  return (
    <Card className="bg-gray-800/50 border border-gray-700 rounded-xl">
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="w-full">
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="40%" height={24} />
          </div>
          <Skeleton variant="circular" width={40} height={24} />
        </div>
        <Divider className="my-4 bg-gray-700" />
        <Skeleton
          variant="rectangular"
          height={100}
          className="mb-4 rounded-lg"
        />
        <div className="flex justify-between">
          <Skeleton variant="text" width="40%" height={36} />
          <Skeleton variant="text" width="30%" height={36} />
        </div>
      </CardContent>
    </Card>
  );
}
