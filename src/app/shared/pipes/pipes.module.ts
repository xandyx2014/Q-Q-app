import { NgModule } from '@angular/core';
import { SumProductoPipe } from './sum-producto.pipe';
import { IsOnlinePipe } from './is-online.pipe';
@NgModule({
    declarations: [
        SumProductoPipe,
        IsOnlinePipe
    ],
    imports: [ ],
    exports: [
        SumProductoPipe,
        IsOnlinePipe
    ],
    providers: [],
})
export class PipesModule {}
