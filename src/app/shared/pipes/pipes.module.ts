import { NgModule } from '@angular/core';
import { SumProductoPipe } from './sum-producto.pipe';
@NgModule({
    declarations: [
        SumProductoPipe
    ],
    imports: [ ],
    exports: [ SumProductoPipe ],
    providers: [],
})
export class PipesModule {}
