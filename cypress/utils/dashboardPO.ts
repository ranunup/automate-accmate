import { Assert } from "./assert";
import { MenuPO } from "./menuPO";

export class DashboardPO {
    static goToDashboard (){
        MenuPO.selectMenu("Dashboard");
        Assert.dashboardVisible();
    }
}