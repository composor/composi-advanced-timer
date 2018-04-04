import {h, Component} from 'composi'
import {title} from './components/title'
import Timer from './components/Timer/timer';

// Set state on component.
// Will cause component to render.
title.setState('Advanced Timer')


const timer = new Timer()
