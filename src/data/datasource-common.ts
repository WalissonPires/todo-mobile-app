import { DataSourceOptions } from "typeorm"
import { Todo } from "./entities/todo";
import { Initial1660916941798 } from "./migrations/1660916941798-Initial";
import { AddCreateAtField1660917298493 } from "./migrations/1660917298493-AddCreateAtField";


export const getDataSourceCommonOptions = () => {

    const options: Partial<DataSourceOptions> = {
        entities: [ Todo ],
        migrations: [ Initial1660916941798, AddCreateAtField1660917298493 ]
    };

    return options;
}