import Browser exposing (sandbox)
import Html exposing (Html, div, text)
import Html.Attributes exposing (class)


main =
    sandbox
        { init = init
        , update = update
        , view = view
        }

init : Maybe a
init =
    Nothing

update : msg -> Maybe a -> Maybe a
update msg model =
    Nothing


header : Html msg
header =
    div
        [ class "header" ]
        [ text "Alex Yuly" ]

contentBlock : Int -> Html msg
contentBlock number =
    div
        [ class "content-block" ]
        [ text <| String.fromInt number ]

view : Maybe a -> Html msg
view model =
    div [ class "container" ] <|
        List.concat
            [ [ header ] 
            , List.map contentBlock <| List.range 1 20
            ]
