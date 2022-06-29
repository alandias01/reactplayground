import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Grid, makeStyles, CircularProgress, Divider, Chip, Theme, Card, CardContent, CardActions, CardActionArea, CardHeader, CardMedia, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Inbox, Mail, ChevronLeft } from '@material-ui/icons';

//To change theme
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        type: "light"
    }
});

type MUIThemingProps = { setCurrentPage: (page: string) => void }

export default function MaterialUIBasics({ setCurrentPage }: MUIThemingProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <TopBar setDrawerOpen={setDrawerOpen} />
                <MyDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
                <LoadingComponent />
                <ShowChips />
                <CardComponent />
                <PaperComponent />
                <GridComponent />
                <Layout01 />
            </ThemeProvider>

        </div>
    );
}

function LoadingComponent() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Button onClick={() => setLoading(x => !x)}>Toggle Loading</Button>
            <br />
            {loading && <CircularProgress />}
        </div >
    )
}

function ShowChips() {
    const [chipData, setChipData] = useState(['Alan', 'Mike', 'William']);
    const chipsDisplay = chipData.map((x, i) => <Chip key={i} label={x} onDelete={() => handleDelete(x)} />);

    const handleDelete = (chipToDelete: string) => setChipData((chips) => chips.filter(chip => chip !== chipToDelete))

    return <div>{chipsDisplay}</div>
}

const useStylesMyDrawer = makeStyles({
    list: { width: 250 },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

const MyDrawer = (props: any) => {
    const classes = useStylesMyDrawer();

    return (
        <div>
            <Drawer classes={{ paper: classes.list }} className={classes.list} anchor={"left"} open={props.drawerOpen}  >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => props.setDrawerOpen(false)}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

const useStylesTopBar = makeStyles((theme: Theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

function TopBar(props: { setDrawerOpen: (val: boolean) => void }) {
    const classes = useStylesTopBar();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.setDrawerOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

/*
    Card is just a Paper with elevation prop
    CardHeader: 16px padding. Flexbox with title centered as flex grow. 
                Attributes for 
                avatar (stays left)
                action (aligned to top right, you can put anything here
                title, subheader (centered, flex grow)
    CardMedia: A div with a background image.  Must specify height
    CardContent: Just adds 16px of padding
    CardActionArea: Creates a button.  You can put CardContent inside CardActionArea
    CardAction: A flexbox where you can put buttons at the bottom.  Usually goes after a card content
                A list of actions. 8px padding and 8px padding horizontally between children

*/

const useStylesCardComponent = makeStyles((theme: Theme) => ({
    root: {
        width: 300
    }
}));

function CardComponent() {
    const classes = useStylesCardComponent();
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    My Card
                </CardContent>
            </Card>
        </div>
    )
}

const useStylesPaperComponent = makeStyles((theme: Theme) => ({
    root: {
        "& > *": {
            margin: 10,
            width: 300,
            height: 400
        }
    }
}));

function PaperComponent() {
    const classes = useStylesPaperComponent();
    return (
        <div className={classes.root}>
            <Paper>P1</Paper>

            <Paper>P2</Paper>

            <Paper>P3</Paper>

        </div>
    )
}

const useStylesGridComponent = makeStyles((theme: Theme) => ({
    root: {
        paddingLeft: '20px',
        paddingRight: '20px',
        alignContent: "flex-start"
    }
}));

function GridComponent() {
    const classes = useStylesGridComponent();

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm={'auto'} >
                <WordCard heading="Word of the Day" word="card 1" />
            </Grid>

            <Grid item xs={12} sm={'auto'} >
                <WordCard heading="Word of the Day" word="card 2 card 2 card 2" />
            </Grid>

            <Grid item xs={12} sm={'auto'} >
                <WordCard heading="Word of the Day" word="card 3" />
            </Grid>
        </Grid>
    );
}

const useStylesWordCard = makeStyles((theme: Theme) => ({
    root: {
        minWidth: 300,
        borderRadius: 0,
        borderTopStyle: "solid",
        borderTopColor: "orange"
    }
}));

function WordCard(props: any) {
    const classes = useStylesWordCard();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {props.heading}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.word}
                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

const useStylesLayout01 = makeStyles((theme: Theme) => ({
    grid: {
        paddingLeft: '20px',
        paddingRight: '20px',
        alignContent: "flex-start"
    },
    gridLeft: {
        height: 300,
    },
    gridMain: {
        height: 300,
    }
}));

function Layout01() {
    const classes = useStylesLayout01();
    return (
        <div >
            <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={12} sm={12} md={4} className={classes.gridLeft} >
                    <Paper>Left</Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={8} className={classes.gridMain}>
                    <Paper>Main</Paper>
                </Grid>
            </Grid>
        </div>
    )
}
