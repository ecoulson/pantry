import { FormData } from '../../core/forms/form-data';
import { ProduceStorageBroker } from '../broker/produce-storage-broker';
import { Produce } from '../models/produce';

export class ProduceService {
    constructor(private readonly broker: ProduceStorageBroker) {}

    createFromFormData(formData: FormData) {
        return this.broker.add(
            new Produce(
                formData.getField('name'),
                formData.getField('price'),
                parseFloat(formData.getField('weight')),
                parseInt(formData.getField('quantity')),
                formData.getField('dateOfPurchase')
            )
        );
    }

    getAllProduce(): Produce[] {
        return this.broker.findAll();
    }
}
