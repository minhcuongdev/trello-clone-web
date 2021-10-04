import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty, cloneDeep } from 'lodash'
import { fetchBoardDetails, createNewColumn, updateBoard, updateColumn, updateCard } from 'actions/API'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }

    const newColumnInputRef = useRef(null)

    const [newColumnTile, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = (e) => {
        setNewColumnTitle(e.target.value)
    }


    useEffect(() => {
        const boardId = '615583763e7f990212916f85'

        fetchBoardDetails(boardId)
            .then(board => {
                setBoard(board)
                setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
            })

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
        let newColumns = cloneDeep(columns)
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = cloneDeep(board)
        newBoard.columnOrder = newColumns.map(col => col._id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)

        updateBoard(newBoard._id, newBoard)
            .catch(() => {
                setColumns(columns)
                setBoard(board)
            })
    }

    const onCardDrop = (columnID, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = cloneDeep(columns)
            let currentColumn = newColumns.find(col => col._id === columnID)

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(cart => cart._id)

            setColumns(newColumns)

            if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
                updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))
            } else {
                updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))

                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload)
                    currentCard.columnId = currentColumn._id
                    updateCard(currentCard._id, currentCard)
                }

            }

        }
    }

    const addNewColumn = () => {
        if (!newColumnTile) {
            newColumnInputRef.current.focus()
            return
        }

        const newColumnToAdd = {
            boardId: board._id,
            title: newColumnTile.trim()
        }

        createNewColumn(newColumnToAdd)
            .then(col => {
                const newColumns = [...columns]
                newColumns.push(col)

                let newBoard = { ...board }
                newBoard.columnOrder = newColumns.map(col => col._id)
                newBoard.columns = newColumns

                setColumns(newColumns)
                setBoard(newBoard)

                toggleOpenNewColumnForm()
                setNewColumnTitle('')
            })

    }

    const onUpdateColumnState = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id

        let newColumns = [...columns]

        const columnIndexToUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate)

        if (newColumnToUpdate._destroy) {
            newColumns.splice(columnIndexToUpdate, 1)
        } else {
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(col => col._id)
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
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumnState={onUpdateColumnState} />
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
                            <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
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