import { NgModule } from '@angular/core';


import { CRUDServiceService } from "../services/crudservice.service";
import { Injectable } from '@angular/core';
 import {ACCESSORIES, BEGINNERS} from './constants'
import { equal } from 'assert';


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

    loadMaterial(apiUrl: string) {
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

    loadBasicMaterial(whatMaterial: 'beginners'|'accessories') {
        let equipment={}
        if (whatMaterial == 'beginners'){
           equipment=BEGINNERS
       }
       else{
           equipment=ACCESSORIES
       }
       let sizes=this.setAmounts(whatMaterial+'/?', equipment);
       return this.setFullMaterialList(equipment, sizes);
    }

    //set current amount for each material to size<Map>
    setAmounts(apiFilterUrl: string, equipment: any): Map<string, number> {

        let sizes = new Map()
        for (let type in equipment) {
            for (let model in equipment[type]) {
                for (let size in equipment[type][model]) {
                    this._http.loadMaterial(apiFilterUrl + 'type=' + type + '&model=' + model + '&size=' + equipment[type][model][size]).subscribe(
                        data => {
                            sizes.set(type + ' ' + model + ' ' + equipment[type][model][size], data.count)
                        }
                    )
                }

            }
        }
        return sizes;
    }

    //return list of maps for all avaible material, exportable to file
    setFullMaterialList(equipment:{}, sizes:Map<string,number>): {}[] {
        let temporaryList = []
        for (let k in equipment) {
            for (let m in equipment[k]) {
                for (let s of equipment[k][m]) {
                    let stringKey = k + ' ' + m + ' ' + s
                    let amount = sizes.get(stringKey)
                    temporaryList.push({ 'type': k, 'model': m, 'size': s, 'amount': amount })
                }
            }

        }
        return temporaryList;
    }



}