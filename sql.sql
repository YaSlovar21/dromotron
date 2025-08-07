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