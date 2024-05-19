type FieldName = String;
type Field = any;

export default function getMissingFields(fields: [FieldName,Field][]): FieldName[]{

    return fields.filter(fieldFilter).map(fieldMap);
}
function fieldFilter([name,field]):boolean {
    return field == null;
}
function fieldMap([name,field] : [FieldName,Field]): FieldName{
    return name;
}
