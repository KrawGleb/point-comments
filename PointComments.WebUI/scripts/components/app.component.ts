import { ComponentBase } from "./base.component";
import { StageComponent } from "./stage.component";

export class AppComponent extends ComponentBase
{
    public static init() : void {
        const stageComponent: StageComponent = new StageComponent();
        stageComponent.init();
    }
}