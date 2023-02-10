export const regExp = {
    name: /^[a-z][a-z\s\']{2,254}$/i,
    surname: /^[a-z][a-z\s\']{2,254}$/i,
    birthdate:
        /((0[1-9]|[12][0-9]|3[01])[\/.](0[13578]|1[02])[\/.](18|19|20)[0-9]{2})|((0[1-9]|[12][0-9]|30)[\/.](0[469]|11)[\/.](18|19|20)[0-9]{2})|((0[1-9]|1[0-9]|2[0-8])[\/.](02)[\/.](18|19|20)[0-9]{2})|(29[\/.]02[\/.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))/,
    phone: /^\d{9}$/,
    img: /(http(s?):)([/|.|\w|\s|-])*/
};