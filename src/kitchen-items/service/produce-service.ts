import { ProduceStorageBroker } from '../broker/produce-storage-broker';
import { ProduceFormData } from '../forms/produce-form-data';
import { Produce } from '../models/produce';

export class ProduceService {
    constructor(private readonly broker: ProduceStorageBroker) {}

    createFromFormData(formData: ProduceFormData) {
        return this.broker.add(
            new Produce(
                formData.name,
                formData.price,
                formData.weight,
                formData.quantity,
                formData.dateOfPurchase
            )
        );
    }

    getAllProduce(): Produce[] {
        return this.broker.findAll();
    }
}
