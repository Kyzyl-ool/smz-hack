import React, {Component} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Box from "@material-ui/core/Box";
import {createMuiTheme, makeStyles, MuiThemeProvider, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import './styles.css';
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {Search} from "@material-ui/icons";

const theme = createMuiTheme({
    overrides: {
        MuiTypography: {
            h5: {
                fontSize: '16px'
            },
            body1: {
                fontSize: '12px'
            },
            body2: {
                fontSize: '10px'
            }
        }
    }
});

export const products = [
    {
        id: 0,
        name: 'Цифровая обработка звука',
        price: 100000,
        avatarSrc: 'https://hholdorf.files.wordpress.com/2015/09/physics-the-nature-of-sound.jpg',
        description: 'Необходимо реализовать библиотеку для обработки звуковых файлов. Подробности читать здесь.',
        keywords: ['Cryptography', 'Python', 'HTML'],
        averageRate: 4,
        type: 'библиотека',
        company: "ООО Солярис",
        orders: 16,
        successOrders: 6,
        interested: 40,
    },
    {
        id: 1,
        name: 'Генерация лиц несуществующих людей',
        price: 50000,
        avatarSrc: 'https://cameralabs.org/media/lab18/12/21-2/iskusstvennyy-intellekt-sozdaet-portrety-nesuschestvuyuschih-lyudey_4.jpg',
        description: 'Нужно сделать библиотеку для генерации лиц несуществующих людей в хорошем качестве.',
        keywords: ['ML', 'CV', 'Python'],
        averageRate: 4,
        type: 'библиотека',
        company: "ООО Солярис",
        orders: 6,
        interested: 20,
    },
    {
        id: 2,
        name: 'Мессенджер с высокой степенью шифрования',
        price: 5000,
        avatarSrc: 'https://www.pngkey.com/png/detail/443-4438515_the-best-ressource-of-free-emoji-png-clipart.png',
        description: 'Необходимо сделать проект для надежного обмена текстовыми и файловыми сообщениями.',
        keywords: ['Cryptography', 'Python', 'HTML'],
        averageRate: 5,
        type: 'продукт',
        company: "ООО Солярис",
        orders: 30,
        successOrders: 29,
        interested: 4,
    },
    {
        id: 3,
        name: 'Нужно протестировать библиотеку дополненной реальности.',
        price: 5000,
        avatarSrc: 'https://www.ittechnologynews24.com/wp-content/uploads/2019/07/AR-VR.jpg',
        description: 'С помощью этой библиотеки можно создавать решения в сфере AR',
        keywords: ['AI', 'ML', 'CV', 'Python', 'C++'],
        averageRate: 3,
        type: 'библиотека',
        company: "ООО Солярис",
        orders: 3,
        successOrders: 0,
        interested: 1,
    },
    {
        id: 4,
        name: 'Система контроля электроэнергии в доме',
        price: 100000,
        avatarSrc: 'https://northcyprussale.ru/uploads/s/d/o/n/don2antj3c4t/img/full_FzgLDdhq.jpg',
        description: 'Здесь реализован функционал для контроля электроэнергии (в том числе домашей) для девайсов Apple Home.',
        keywords: ['Cryptography', 'Python', 'HTML'],
        averageRate: 2,
        type: 'библиотека',
        company: "ООО Солярис",
        orders: 1,
        successOrders: 0,
        interested: 21,
    },
];

export const developers = [
    {
        id: 0,
        name: 'Дроздов Николай Константинович',
        price: 1000,
        avatarSrc: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
        description: 'Опыт разработки: 12 лет. Работал в команде, TeamLead',
        keywords: ['IT', 'Backend', 'Flask'],
        averageRate: 4,
        company: "ООО Солярис",
        lives: 'г. Москва',
        age: 40,
        education: 'МГУ (мехмат)',
        yearsOfExperience: 12,
        proffession: 'Backend-developer',
        about: `Сдержанный
Наглый
Впечатлительный
Честный
Адекватный
Вспыльчивый
Жизнерадостный`,
        projects: [
            'https://github.com/ziadoz/awesome-php',
            'https://heml.io/',
            'http://www.vanillalist.com/',
            'http://idangero.us/swiper'
        ]
    },
    {
        id: 1,
        name: 'David DeSandro',
        price: 2341,
        avatarSrc: 'https://cloud.24ways.org/authors/daviddesandro280.jpg',
        description: 'Worked as middle frontend-developer for 3 years. Have 10+ projects done.',
        keywords: ['Frontend', 'IT', 'React', 'Vue'],
        averageRate: 4,
        company: "Google",
        lives: 'San-Francisco',
        age: 27,
        education: 'MIT (Engineering)',
        yearsOfExperience: 3,
        proffession: 'Frontend-developer',
        about: `Мнимый
Ранимый
Благоразумный
Беспощадный
Скучный
Коварный
Доверчивый`
    },
    {
        id: 2,
        name: 'Калягин Иван',
        price: 1000,
        avatarSrc: 'https://d38we5ntdyxyje.cloudfront.net/1335765/profile/UBUAADBC_avatar_medium_square.jpg',
        description: 'Занимаюсь машинным обучением 2 года. Готов взяться за любое RnD решение. также предлагаю некоторые свои проекты для покупки (см. профиль)',
        keywords: ['ML', 'AI', 'Text Recognition', 'Algotrading'],
        averageRate: 5,
        company: "Tinkoff",
        lives: 'г. Москва',
        age: 22,
        education: 'МФТИ (ФПМИ)',
        yearsOfExperience: 2,
        proffession: 'Data Scientist',
        about: `Деликатный
Активный
Асоциальный
Общительный
Деятельный
Грубый
Осторожный`
    },
    {
        id: 3,
        name: 'Павлов Дмитрий',
        price: 1500,
        avatarSrc: 'https://avatars.sched.co/f/16/5055544/avatar.jpg?3c2',
        description: 'Занимаюсь машинкой больше 5 лет. Предпочитаю работать в одиночку',
        keywords: ['AI', 'ML', 'CV', 'Python', 'C++'],
        averageRate: 3,
        company: "Royal Dutch Shell (A)",
        lives: 'г. Санкт-Петербург',
        age: 23,
        education: 'МФТИ (ФПМИ)',
        yearsOfExperience: 5,
        proffession: 'Data Scientist',
        about: `Предприимчивый
Филантроп
Истеричный
Саркастичный
Дальновидный
Жизнерадостный
Перфекционист`
    },
    {
        id: 4,
        name: 'Андрей Павлов',
        price: 100000,
        avatarSrc: 'https://pbs.twimg.com/profile_images/1098525000/_avatarbig_400x400.jpeg',
        description: 'Работаю frontend-разработчиком 1 год. Выполнил 5 проектов (см. профиль)',
        keywords: ['Frontend', 'JS', 'HTML', 'CSS', 'React'],
        averageRate: 2,
        company: "ООО Солярис",
        age: 20,
        education: 'СПбГУ (мехмат)',
        yearsOfExperience: 1,
        proffession: 'Frontend-developer',
        about: `Самостоятельный
Опрятный
Мягкий
Предприимчивый
Обаятельный
Строгий
Жадный`
    },
    {
        id: 5,
        name: 'Петров Игорь',
        price: 3000,
        avatarSrc: 'https://yt3.ggpht.com/a/AGF-l7_0hOupCneD2mC4JbiATdXtMysFkXWkkbeR4Q=s240-c-k-c0xffffffff-no-rj-mo',
        description: 'Senior fullstack-разработчик. Занимаюсь разработкой 20 лет. Предпочитаю сразу качественно выполнять работу, без тестовых заданий',
        keywords: ['Fullstack', 'Frontend', 'Backend', 'System architect', 'Designer', 'Mathematics', 'UI/UX testing', 'ML', 'JS', 'Python', 'Go', 'C++', 'PHP', 'Angular', 'React', 'Vue', 'Svelte', 'Flask', 'DJango', 'nodeJS'],
        averageRate: 4,
        company: "Yandex",
        lives: 'г. Казань',
        age: 45,
        education: 'МГУ (мехмат)',
        yearsOfExperience: 20,
        proffession: 'FullStack-developer',
        about: `Беспощадный
Уверенный в себе
Грубый
Мнимый
Общительный
Грамотный
Занудный`
    }
];

// fake data generator
const getItems = (count, offset = 0) => {
    return Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: <MuiThemeProvider theme={theme}><Paper>
            <Box display={'flex'} p={1}>
                <Box mx={1}>
                    <img src={products[k].avatarSrc} alt={'Product image'} className={'card'}/>
                </Box>
                <Box textOverflow={'ellipsis'} mr={1}>
                    <Typography variant={"h5"}>
                        {products[k].name}
                    </Typography>
                    <Typography variant={"body2"}>
                        {products[k].description}
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
                    <Box>
                        <Typography>
                            <b>Тарификация:</b>
                        </Typography>
                        <Typography>
                            {products[k].tariff}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            <b>Стоимость:</b>
                        </Typography>
                        <Typography>
                            {products[k].price}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper></MuiThemeProvider>
    }));
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    margin: `0 0 ${grid}px 0`,
    // background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 350,

});

export class Example extends Component {

    state = {
        items: getItems(10),
        selected: getItems(0, 1)
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = {items};

            if (source.droppableId === 'droppable2') {
                state = {selected: items};
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
            this.props.callback({
                items: result.droppable,
                selected: result.droppable2
            })
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <>
                <Box display="flex" m={1}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="input-with-icon-adornment">Поиск продуктов:</InputLabel>
                        <Input style={{marginTop: "8px"}}
                                id="input-with-icon-adornment"
                               startAdornment={
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box ml={1}>
                        <Button styles={{marginLeft: "8px"}}
                                variant={"contained"}
                                color={"secondary"}
                                onClick={() => window.open('http://35.184.188.51:5000')}>
                            Подобрать
                        </Button>
                    </Box>
                </Box>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Box p={1}>
                        <Box display={'flex'} justifyContent={'space-evenly'}>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Typography variant={"h5"}>
                                    Все продукты
                                </Typography>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state.items.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Typography variant={"h5"}>
                                    Собираемый набор
                                </Typography>
                                <Droppable droppableId="droppable2">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state.selected.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Box>
                        </Box>
                    </Box>
                </DragDropContext>
            </>
        );
    }
}
