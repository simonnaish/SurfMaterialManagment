import { NgModule } from '@angular/core';


import { CRUDServiceService } from "../services/crudservice.service";
import { Injectable } from '@angular/core';



@NgModule({
    declarations: [],
    imports: [],
    providers: [],
    bootstrap: []
})


@Injectable()
export class materialLoaders {



    constructor(private _http: CRUDServiceService) {

    }

    loadMaterial(apiUrl) {
        let repairedItems = []
        let soldItems = []
        let avaibleItems = []
        this._http.loadMaterial(apiUrl).forEach(iter => iter.results.forEach(item => {
            if (item.repair == true) {
                repairedItems.push(item);
            }
            else if (item.sold == true) {
                soldItems.push(item)
            } else {
                avaibleItems.push(item);
            }
        }));
        return [avaibleItems, repairedItems, soldItems]
    }

    loadBasicMaterial(apiUrl) {
        
    }
}