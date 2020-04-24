import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box/Box";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    img: {
        width: "64px",
        height: "64px",
        transform: "none",
        top: "0"
    },
    gridList: {
        width: 620,
        height: 400,
        padding: 4
    },
    tile: {
        padding: "4px",
        height: "200px"
    },
    tileIns: {
        boxShadow: "0 0 2px rgba(0,0,0,0.5)",
        height: 184,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    tileInsChecked: {
        boxShadow: "0 0 8px blue",
        height: 184,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const tileData = [
    {
        img: "https://storage.yandexcloud.net/products/f2ecbu7femm9edja45i8.svg",
        title: "Операционная система"
    },
    {
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAilBMVEUybOX///8uauUmZuQqaORRf+hVgugSX+MfY+QbYuQVYOMMXePz9v38/f+Ure/3+f7q7/yJpe68y/WjuPGwwvPl6/vF0vZ/nu29zPVKe+fb4/rS3PhnjeqovPI6cebn7ftfiOl6muyOqe9tkeubsvDX4PlEd+emuvLN2Pd0lus/dOYAWuMAVeKtwfPwQ0gNAAATzElEQVR4nO1dbXvqoLKNgZqE+NJa32utWmure+////euUZMwMBCGkN7z3HvmY6vICjAsZtaQqPf/wKL/7Q78hv0XZHB7nr5snp42h8ngV3/2N0HO+3nKeRxzlua7n1/84d8DObkIHlXGxWr+az/9WyCn2yyOgMXiMvmlH/8VkMN3nka6xVn07zd+/jdAjo8pBvFmKX8ddt+DzkEODhmLTRgLmOlx3HUfOgb5vEisEItJy8Sh4x2lU5Czfc7tCO/G8sVHl/3oEOT6M2cuEAvj+XnWXU86A/m2cxvFGubmq6u+dARy/pSQIN5gJv2OaFAnIJcnQYZ4h9kNDeoA5HQrGhyq2eKsCxoUHOR7pPI3KsxoGrpPYUEOX5mR3Lhbyr/D0qCQIAcj0bTzu8IMS4PCgXx+aSQ37haWBoUC+bFw3/ndjCWL50CdCwPySm689gy7BaNBIUB+bbqAeIf5uQ7QwfYgf/p0ckOBGSAa1BbkfOVHbggw29OgdiAnLciNu7WOBrUB+a8luSHAzLZtaJA3yOErGpzqDGYav/82yPEx+02IN7vSIE+25wVycPAnN0wIX9YQs2TkRYM8QH4sEm9yw6P39fqbeztkJl48aBAZ5OzcYufnq9uEG1/8HRbP92QaRAS5bkduxGO2PectGmFkGkQC+bNrR274S9nSuV07+e6tI5A+wSloaUVdpi19M0+eCDTIGeTk0p7cZBUNnWdt2+LitAwMchqE3IQEWbA9VxrkAnL4HofZ+cNN17vFWeREg5pBDo8hglM3Y1WXjqHCCClzoEFNIMMFp67GFmWz7bwrbFQ00iA7yMGLP7lBLF6VDW9DtsqSFztMK8h/3jTTYEnZchsygBgTVhdkA/kZ/EScP6Kpz0nghuNk7wdyF/4wJR587EsEbzr99AG57+DAWG6Uyy7afjFCMYKchJ5RhaWPWE2YbVKx3Ej0TCCHgV3O3dKHf3jtpHXjgJn+8dpJdKNkA6NOQGYmF2sC2UUnriPZKcj4RAPZgfsrLHusyfduomCJQShjAPndzaLhD545SDoJ2KaG+WoA+dlJ7J9VYYt1J0PJFzgaA8hwpLy2mEs/FnfyFLcUkLOwS7LQKoucr/bSVDmJRKQ88LNMcKKOgwy5WfNUpLvRcq2JAAZv/xYnYddQEi3D+QAOchFqMvEs27zbAojjn8MpnNaAjQggWwR/JeNpdp47pC8+3leBjq3xkzvIQQjeyvP+xDlBMxuxIGlAgf4iCrIxltbcH5YsiNH85cohrBs3uCqBBp1RkFbWxUV04Q3HaYe4C2KN6lGeXDZ2bSJ7dQbZt7TD+oUf+TlZngNPDp56qrcn294lNsXkmPVtP40enTGQQ8uS5P3HhxamKR3nny1ERsvICCEvR+nJPAYxcwVpY+eiWmkj/FNs21KSMjLM2bwSR9j6l2CeAANpZef1xw7YWOaHdhCvNlthVCSXyLelfyhHx0Da2PlF/pzWGcZJKTWTjfSIpZC3eYuLRTk6BtK2Y6XyRrRRHmm2C6RTfVMT7kKeIPaAphvIma0NOB12AGV+NHf7Yzn65JJD+ojOx7nZQY37YJYIEImz7nA5snchICdWds5AIxvps4kpWjaY7KM8ZTyRxnmQc5bllxcj7VtIjzoBC/3LOpAYR0dA2tl5HAH/dS49XZziPHw42SXp7dHHXP5zev9TJs6GZ/NaLUw4Q+Z2IoJxdATk1s5m4gTUA47y28d5jM692SJJ62cm/6dyHlzwI0qPlneUPAHCupeGyAnG0XWQzew8W8k+9Oc6Fa9AsH6+QSEFOLeDp5+gtVrzPMqu7EOeOdO48biCcHQdpEOmO8438rgNrjsrgnGtaEXivvxfeJrj+QJp4UdZ5m8nhyw8wtF1kE4xUZ5YPOnNhlrFHd/J/1f5MRMotwYtOsX42LcDSBs7lyw9WRVDk1R7VpA8b7SfSS/WFpfM7WCNcHQN5NBVlxFbtsXhJ/LQIRlBaJWtxd7eNW8LnLgB5Je7+ERsDB1aowFH6NxfsI+kfcMxdHBxj4/oHF0D+U6ItrCV+u2bTfGHzsA44UufM7SIckzRVeocXQNJip0nGB8/GCYWA5obk8glx+Tm/yghUp2jayBJ4UEs2nA2zfcUdN/Y71z3jr0DKUSqxdFVkFZ2rlnMtBPy2ugEU6CFMzLk9KKty3+0gL7G0VWQdnauGddX5fBs2M4gdTbIBjAPOyQmLTSOroIkxs7RjOAkRRsRYBv8QWc1izDHM6fFgTWOroJsYOeKpXhYftDHEAjg2tfIR+J8j7ZHzCRqHF0BSY2d430qzkn6w4KjjiTOuDApWInipkTh6Eo3aTpUYa4uWm81/5OAYKze78zEBHpUkYHK0aMWjRmFCDdbqNtlBv49VkYyzm0EfZiSdjZlF1JAOrLzuwm7DHyu+B8IsgfnDNvaUyckyY3K0SFIZ3ZemH0grzbegdGK4X9BrxOzZuzRM8pQqhwdgiSw8+vIQDeBOY136dgcK1uq1BLj2JyADZK0zgpHhyAp7FxxrdO/mBx8dqoGTHXsq2poxAbLD738BVsmye8rHB32lLIfwUNFjymBw9Iquq7y5vLUzBP0oqzPlMOnsicMgPJbECTFhUGlRTGbsjPW2zIanijz+UFI0xNGmoZPTHVsFJFYfAGtAZAfhCnBwYn57hdSEMWp/vdZrMxM+18/iyOOJ4juZ2RlFVOEDJCjA5AUdg7PFA8Pz05o9nX+lERIZOO42p7RsM7sMfgCnHEo+lHI0QFINCRhMEidyr/yKMAtD2/lMQbG9yilepCjA5An9wkB99t5tV5M2QKCLWswcCtYEboHYrwyyDHhUcFjvhxfNOZ9HO1b6gUcEMpWCSaaDJLCzsHKHshPJ85bXRp0AM4PUJc1wb8KeZOVQRKeFKR0ihQvx0+ZTqZEiOB5ghB/AhxdBklg5xxwzZ3yxcygO220oVqLwsAOQ+AqwGfIIAmzASxJXRKTmsLOdhsj6iD5/wTWGac4SAo7B24PCdewlYd64DnSRwqEE94oi1LqoQSSoH6HmiBsLfMtecNcY6cpQLXVg7bN5C9KIAk1jTDVqC7JO0pGFBDiITlItQkVifIXZVm4XwsmWU2ckGjBEgl9RSp/1fN9RoulOHoNksLOQXrAFEqLmb4uZ+ub6YM8+2P4KSAcOlDoQL2T1yC92TkeJo7qeh7po3+zwsQfbZCN3QcujlI0I3H0GiSFnYM92vh0mBq4ea4+ydXoo3EigvPEnABSooQ1SAI7h8FwI1Fi6vHqUiHhapDbOJKpHDegHJwljl6BpLDzKJH3B1NeLf6jnPk/JSCpQopmfwzPGDwpUr1KzdErkMaVhZmQz8b41hOzXIl3HEEPE4XGzxM86AgIJCldUHP0CiQp5AdcHsIoeZpvRwobUP3nH+X/g9enBCn54XLgaEAZyZqjVyDRHd0IUu6d6jN4luz+6ZuEuh4y7ROF0pCpdzcApk3KVNbfrECS8kZGkJwlkUn5CA/23MDhv44rMKAQJCnCX/WyBEk5kCogq+nKM7F7N5M56EA111vbYHKuBxSApJBXaYstQZL0FVEmj9XN8RRDuJhbKyVgAj2z6/G/Rqu7vtJ/TdYcvQRJu3FEyHv5gl39TP+1kY/DaFveeBZ7npwzwZi3d60ZdgmSJhUAZGCULpZOxS5yC2r6x2Bvo60cSyHWdZYc/QGSws4jRePgXLAkVXwwa8oVmPz8iPXkJUd/gCQqW1K/sOPz/eab4m4Zvxg0hbtGNe99gKSw8wg7XzhacUGjX7XazYil+yVHf4CksPMrxsz/tTTjke+1l73iPlkSypKj30HS9h/RpFru0F5JPX1sdXeQBHbOWe4bVQ1iiz+EmvbsTQLZyM5jzhlLMyH45hikHMvfPqaLVSpEljLGmjzJg6PfQdrZORfZ6nNxOE7nM5LHmM2nbl74+f11+kVqerCeT1+Ph01kr/h+cMI7SOtyTs5vVFfxMX/dr9IkSwV3eJ3LNE9ZKpJoM5rQoF5tdrCWGPAapJWd01Jxzz/viwIeeyycOGvs9roMCvBiQRRQ15SHag2r3zn6DaSNnZtuRkHhPYkaXvl9RIgMTVGfFlDz6NMdqo3I3Ht/A2ll5y6/M33p8zxD3Z7pZpXa0FzV7baQy6fTZmXp/P3XbxgsGDkqW1HtmBjduuXc+LAXs+/QbzDDRteW0duWIG2KAx3kz6jPNusx2Egscqmk0fO8Wb4Mzm/Lj2WUbPfaGzpte8MtI16AtN4iB7V48+KIx6+bSv4XBMGNE75RZdizcEqo/pj9FUVHi8PrVMY5tjGZG0cvQFozDNJ0+1qkWX1YAjnztWk0UgeWa/R7UMdTMxaeJpva5++tV0gcHyDtWepHXfhgulIWHuioacpkDi7SFJ5SDtYgb8fF9h6LGJytm/xtuRVdfWq4yIPtRy+nXI39QuXbGl/XXPMck8VC23gNB70EDKS2HzLBPxdNLyu5BQUdQBa3PyHOU4kp4tNBKw7rC84TNRqJV9xAwRG27IuO2btegySkNmXLAQA0xqTldV5ucytTVYPobR45cG2et6VW05UYFqi+D7f5I7I2FHFz7+MxqXMlFbREVqWS+KPkX+VWSsdDDPBUptwthuwEar1mJeRVJyzymGPgsmjH+tqqLWTgeTmw8qxnWjNqPVG97as1ifqBFnod79snb+Hd20ZASvbILcCY27c66RIlJldnQ9Swq7biUvgAfQfyTthuIH88h1LlfMqFJ2p5xkR6CGpxkOKc1Wo+C7+12t15uUQGLG0oxPQC2hFKugN+F/7vB5aQKJoCWlVnbY9RuP/WwPM+NZWZPssPPFYqUmGRTqqE0OVyP00CRCo8koyPJZDFDRRelilHYpnDKhHoMXyQsYD5EzlurN6ePPFckeVEK2fN0bMdtUpUukcGVtlpy0rxzeP6i2rt9phUjSb1rTwcVEvj029pa/W+VU5G4Qof2lxRnk8VBdHq0z0ZWS0wqdf/xbMpVaZcih0hK0O4reJ8S4qvFsn0pn6TTKKUNchnz/eUJGrK+C5bVXbCL2TR55AR3M4JPFMjCd6eFdPWee+WqRqOGO4ytdwALXdQnkOxjbKTmtMb0qqsK5Mnkrxd0ZIplXE9wnHMObwKcIk2ncEHwbDXKPgekeRIKtiTz55MX1erfHF4mjJ9FXzooGq4euXZjGyQFcKfObX1Y5UNwbT7NnQVMoJnPf387XmKhOdtCHLgSREzeyWIcaOLU7uiwvMtEHEMm1UoJOYEXSyxojQfeDVJLLClZ2+U3Uu7MeLd02HbUNqC16ab9gub+D5xlU1oqQ5KVa1swpzzsJEpk8Tuav98tzSt7lTP56w8Gb+xqmewM112XlxAuDKl9pCrQZ2M6eW4yOV8vnegs5Opv8P5YSVEyjiPb2DjIjufZsnqxazGO3ueGOLI5XK+3tpUvdBknFnkBMP15LjvX1iS5zm79PejyZcluD5Y+V6MniMaPyz9OPW+Bt12JxvF1Bs1CD3A7nRAc6wL71cTpE8h3lzfdCmm2fANG08kW+6nbjAu/F+n/LAv/ZYb519H7wAwgBy3eAFDtiK/mFa2wcL/rTDxFl/mBkmAIUnlZHqNEsW83V4R/6K9w8ebbRinjLP1vQfS+PYwo7jD84xTWDuQ3j+bGV27uUe2VwBYLW/lYPWMiqMhp9pmkEOHF2ZgFtf3Ac+PrniXdaDIN85teEmRHaRvBEmqmt+mSd9SKPKw8XyfiroffonIWFiep20B+R3nqqzltKD6PE22L0vjeWr8c+yLjMcRX5VBGb/XzuS2MhOrlxh5RCmrnOSoKlK+AmW7w/TnQ2Ljw8HX8njeFlK8+4fi6kTqk4q0i6ntrtAj21UmiGHEPL4pIHO2Pa36/afTJUqS4lQCvllmM4f0RcksrxFtBEl3PtVNiejNm/HtlBXjjVahkCV1wvKLCYALyN4HkWNVTGDssbKq0lXqBMoanHjTzk3M6VUJdJ93rFXS2gHttcJWp+MCsncklQFXcWuf3HWdoiGdaBtviW8Gqb35xGL1+vfbB2qCTSgCZM2KXAei6ZxxiVm1R9CuMqz6W42J+3t3kUyMD8hn1xUiyT5pZVGlSWku5zWNvfrBA6Sz86n1V76vDZeEP47zNXcpxXE6F7kJCiT9la+QTUpquvGexCnY4nb4cxIUSEWVvq+UleLpTm8eZ3un7juecF0EBXUptv+rHev56gISuYW9Dchnh5+sfaOnbDOSs1wuN1hod8G0A+kkKCiPrcQCaWCV1Nlh6qiit9Yge9/NzofdE1sfniGFu/E7SgcKol6REgCki6CAPU3Wbwca8dRMLOY/79vmgURy+O1BuggK4jTLWr/C9nrydLhPUZO3hwE56Oat7n4Wc8LLSilBUl9BQRemygKCgey9h33beAtDX4ITBqS3oCC0pU0X4LcB6S0oCGuKFik0SF81U1DDZAEhQf5HOB/0Db4hQbYQFATDSHI6XiBbCArCmK5F6gCkd/1CGPPJ8XqAHLtfMBLeyE7HE6S5gPkXMJKdji/IFoKCtmaUBYQH2UZQ0MoaxMNhQfoLClqZRTfaBUhfQUErs8kCugDpXZLSBqOwqJw7AemtD/c3P6fTCmTv4Fn25Gst7lhrIZ/yLZ/1swZZQFcgfauovKxJFtAVyN7HL0ZD0jZatlZqvy9/aSrNiO85CAqyN4t+hRSwre/mEQJkb7jIO4fJc1rYKjjI62DuC+kYj12N04wJsWg3jCFAFqUto8/+k6P1SbY7H5s0Oi4WAOR/vv0X5P8V+x/criFW+sDbfgAAAABJRU5ErkJggg==",
        title: "Облачное решение"
    },
    {
        img: "https://cdn.auth0.com/blog/react-js/react.png",
        title: "Библиотека"
    },
    {
        img: "https://storage.yandexcloud.net/products/f2e0bp8j5ot2hgqcnf4f.svg",
        title: "Postgres database"
    },
    {
        img: "data:image/png;base64,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",
        title: "Docker image"
    },
    {
        img: "https://previews.123rf.com/images/asnia/asnia1709/asnia170900347/86388947-big-data-logo-machine-algorithms-minimal-design-science-vector-background-illustration-.jpg",
        title: "Big Data"
    }
]

export default function ProductGridList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(undefined);

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3}>
                {tileData.map((tile, index) => (
                    <Box onClick={() => setChecked(index)} className={classes.tile} key={index} cols={tile.cols || 1}>
                        <Box className={index === checked ? classes.tileInsChecked : classes.tileIns}>
                            <img src={tile.img} alt={tile.title} className={classes.img}/>
                            <Typography>{tile.title}</Typography>
                        </Box>
                    </Box>
                ))}
            </GridList>
        </div>
    );
}