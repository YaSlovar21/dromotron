SELECT
 -- pattern
 CAST(
    "[" ||
    String::JoinFromList(
        ListMap(
                AGGREGATE_LIST_DISTINCT(image_name),
                 ($x) -> { RETURN "\"" || $x || "\""; }  -- Используем двойные кавычки
             ),
             ", "
         ) ||
        "]"
    AS Json)  AS pattern_array,

    CAST (textId AS Utf8) AS categoryTextId
FROM
    `api.dromotron.ru/price_catalog`
GROUP BY
    textId;

-- запрос на создание имени файла и роукта страницы пластины
UPDATE `api.dromotron.ru/price_catalog`
SET linkPath=CAST("komplektuyushchie-dlya-teploobmennikov/plates/" || String::JoinFromList(String::SplitToList(textId , ".") , "_") || "/" || String::JoinFromList(String::SplitToList(textId , ".") , "_") || "-" || Unicode::ToLower(steel_mark_aisi) || "-" || Unicode::ToLower(pattern) || "-" || Unicode::ToLower(holes) || "-" || String::JoinFromList(String::SplitToList(CAST(thinkness AS String), ".") , "_") || "-mm.html" AS Utf8)

-- запрос на создание имени файла и роукта страницы уплотнения
UPDATE `api.dromotron.ru/price_catalog_uplots`
SET linkPath = CAST("komplektuyushchie-dlya-teploobmennikov/uplots/" || String::JoinFromList(String::SplitToList(textId , ".") , "_") || "/uplot-" || textId || "-" || material_sm || "-" || type || ".html" AS Utf8)

--запрос на умножение цены
UPDATE `api.dromotron.ru/price_catalog_uplots`
SET decimal_test = price * CAST("2.57" AS Decimal(22, 9));

$upd = (
SELECT
    id,
    CAST (
        CAST(
            CAST(
                (decimal_test * 1000)
                + CAST(500 AS Decimal(22,9))
                AS Uint64
            )
            / 1000
            AS Decimal(22,0)
        )
    AS Decimal(22,9)
    )
AS decimal_test1
FROM `api.dromotron.ru/price_catalog_uplots`
);

UPDATE `api.dromotron.ru/price_catalog_uplots` ON
SELECT * FROM $upd;
--запрос с приведением к регистру
UPDATE `api.dromotron.ru/price_catalog_uplots`
SET material_sm	= Unicode::ToLower( CAST( String::SplitToList(material, " ")[0] AS Utf8))
WHERE material_sm="fkm clip-on"

