import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

    const newColumnInputRef = useRef(null)

    const [newColumnTile, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = useCallback((e) => {
        setNewColumnTitle(e.target.value)
    }, [])


    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [openNewColumnForm])

    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board Not Found</div>
    }

    const onColumnDrop = (dropResult) => {
        let newBoard = { ...board }
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }

    const onCardDrop = (columnID, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {

            let newColumns = [...columns]
            let currentColumn = newColumns.find(col => col.id === columnID)

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(cart => cart.id)

            setColumns(newColumns)
        }
    }

    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }

    const addNewColumn = () => {
        if (!newColumnTile) {
            newColumnInputRef.current.focus()
            return
        }

        const newColumnToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardID: board.id,
            title: newColumnTile.trim(),
            cardOrder: [],
            cards: []
        }

        const newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)

        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }

    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate.id

        let newColumns = [...columns]

        const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)

        if (newColumnToUpdate._destroy) {
            newColumns.splice(columnIndexToUpdate, 1)
        } else {
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(col => col.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }

    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
                    </Draggable>
                ))}
            </Container>
            <BootstrapContainer className="trello-container">
                {!openNewColumnForm &&
                    <Row>
                        <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
                            <i className="icon fa fa-plus" />
                            <div>Add another card</div>
                        </Col>
                    </Row>
                }
                {openNewColumnForm &&
                    <Row>
                        <Col className="enter-new-column">
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter column title..."
                                className="input-enter-new-column"
                                ref={newColumnInputRef}
                                value={newColumnTile}
                                onChange={onNewColumnTitleChange}
                                onKeyDown={e => (e.key === 'Enter') && addNewColumn()}
                            />
                            <Button variant="success" size="sm" onClick={addNewColumn}>Add Column</Button>
                            <span className="cancel-new-column" onClick={toggleOpenNewColumnForm}>
                                <i className='icon fa fa-trash'></i>
                            </span>
                        </Col>
                    </Row>
                }
            </BootstrapContainer>
        </div>
    )
}

export default BoardContent