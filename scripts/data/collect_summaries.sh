#!/usr/bin/sh

for cmd in yq jq
do
    if ! command -v "$cmd" >/dev/null 2>&1
    then
        echo "Requires command '$cmd' which could not be found."
        exit 1
    fi
done

mkdir -p data

for file in data/118/bills/s/* ; do yq -o json '.' "$file"/fdsys_billstatus.xml > "$file"/status.json ; done

printf "[" > data/all.json
for file in data/118/bills/s/* ; do cat "$file"/status.json ; printf "," ; done >> data/all.json
sed -i '$ s/,/]/' data/all.json

jq '[ .[] | .billStatus.bill | { title: .title, number: .number, congress: .congress, summary: (try .summaries.summary catch .summaries[0]).text? } ]' data/all.json > data/processed.json
