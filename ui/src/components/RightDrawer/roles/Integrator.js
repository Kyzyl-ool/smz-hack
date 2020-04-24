import React, {useState} from 'react';
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import numberSeparator from "../../../utils/numberSeparator";

function Integrator({content}) {
    const [label, setLabel] = useState('Разместить на маркетплейс')

    console.log(content);
    return (
        <Box display={'flex'} flexDirection={'column'} position={'relative'}>
            {
                content.sum && <>
                    <Typography>
                        <b>Итоговые показатели собранного проекта:</b>
                    </Typography>
                    <Typography variant={"body2"}>
                        Суммарное потребление памяти:&nbsp;<b>{content.memory.toFixed(1)}&nbsp;Гб</b>
                    </Typography>
                    <Typography variant={"body2"}>
                        Требуемая мощность ядра:&nbsp;<b>{content.performance.toFixed(1)}&nbsp;Ггц</b>
                    </Typography>
                    <Typography variant={"body2"}>
                        Требуемое кол-во ядер:&nbsp;<b>{content.cores.toFixed(0)}</b>
                    </Typography>
                    <Typography variant={"body2"}>
                        Требуемое кол-во ОЗУ:&nbsp;<b>{content.RAM.toFixed(1)}&nbsp;Гб</b>
                    </Typography>
                    <br />
                    <Divider />
                    <Typography>
                        Итоговая стоимость лицензий:
                    </Typography>
                    <Typography variant={"h6"}>
                        <b>{numberSeparator(content.sum)}&nbsp;₽</b>
                    </Typography>
                    <Typography>
                        Расчетный ежемесячный платеж:
                    </Typography>
                    <Typography variant={"h6"}>
                        <b>{numberSeparator(content.sum2)}&nbsp;₽/мес.</b>
                    </Typography>
                    <Typography>
                        Итоговая стоимость набора:
                    </Typography>
                    <Typography variant={"h6"}>
                        <b>{numberSeparator(content.sum)}&nbsp;₽</b>
                    </Typography>
                    <Typography variant={"h6"}>
                        <b>+{numberSeparator(content.sum2)}&nbsp;₽/мес</b>
                    </Typography>
                    <Divider />
                    <Typography>
                        Ваш заработок с продажи одного пакета:
                    </Typography>
                    <Typography variant={"h6"}>
                        <b>{numberSeparator((content.sum*0.07).toFixed(2))}&nbsp;₽</b>
                    </Typography>
                    <Typography variant={"h6"}>
                        <b>+{numberSeparator((content.sum2*0.07).toFixed(2))}&nbsp;₽/мес</b>
                    </Typography>
                    <br />
                    <Box justifySelf={'flex-end'} alignSelf={'center'} >
                        <Button color={"primary"} variant={"contained"} disabled={label !== 'Разместить на маркетплейс'} onClick={() => setLabel('Размещено')}>
                            {label}
                        </Button>
                    </Box>
                </>
            }
        </Box>
    );
}

export default Integrator;
