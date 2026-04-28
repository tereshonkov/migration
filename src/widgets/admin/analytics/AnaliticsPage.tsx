import UsersDaily from "@/widgets/admin/analytics/dashboard/UsersDaily";
import UsersMonthly from "@/widgets/admin/analytics/dashboard/UsersMonthly";
import UsersCall from "@/widgets/admin/analytics/dashboard/UsersCall";
import UsersRouts from "@/widgets/admin/analytics/dashboard/UsersRouts";
import UsersLastReview from "@/widgets/admin/analytics/dashboard/UsersLastReview";
import UsersDiagramm from "@/widgets/admin/analytics/dashboard/UsersDiagramm";
import Calendar from "@/widgets/admin/analytics/dashboard/Calendar";
import Grid from "@mui/material/Grid";

export default function AnaliticsPage() {
  return (
    <Grid container spacing={2}>
      <UsersDaily />
      <UsersMonthly />
      <UsersCall />
      <UsersDiagramm />
      <Calendar />
      <UsersRouts />
      <UsersLastReview />
    </Grid>
  );
}
