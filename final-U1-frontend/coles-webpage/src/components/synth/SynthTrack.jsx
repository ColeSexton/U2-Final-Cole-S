import React, { useState, useRef, useEffect } from 'react';
import { createSynth } from '../../utils/audioUtils';

const keyboardNotes = {
    a: 261.63, //c 
    w: 277.18, //c#
    s: 293.66, // d
    e: 311.13, //d#
    d: 329.63, //e
    f: 349.23, //f
    t: 369.99, //f#
    g: 392, //g
    y: 415.30, //g#
    h: 440, //a
    u: 466.16, //a#
    j: 493.88, //b
    k: 523.25 //c
}