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